
type_mapping = {
    'status': 'text',
    'email': 'text',
    'inputToken': 'number',
    'outputToken': 'number',
    'amount': 'text',
    'model': 'text',
    'createdAt': 'date',
    'timeTaken': 'number',
    'id': 'text',
}

operators_mapping = {
    'text': ['is', 'is not', 'contains', 'does not contain'],
    'number': ['equal', 'not equal', 'greater than', 'less than'],
    'date': ['is', 'is not', 'after', 'before'],
}

not_allow_many_inputs = [
    'greater than', 'less than', 'after', 'before',
]

field_to_column_mapping = {
    'status': 'type',
    'inputToken': 'input_token',
    'outputToken': 'output_token',
    'amount': 'amount',
    'model': 'model',
    'createdAt': 'created_at',
    'timeTaken': 'time_taken',
    'id': 'id',
}

def convert_value(column_name, value):
    if type_mapping.get(column_name) == 'text':
        return f"'{value}'"
    return value

def get_operator_sql(column_name, operator, value):
    if operator == 'equal':
        if "cost" in column_name:
            return f"ABS({value} - ({column_name} * 100)) < 0.005"
        return f"{column_name} = {value}"
    elif operator == 'not equal':
        return f"{column_name} != {value}"
    elif operator == 'greater than':
        return f"{column_name} > {value}"
    elif operator == 'less than':
        return f"{column_name} < {value}"
    elif operator == 'after':
        return f"{column_name} > {value}"
    elif operator == 'before':
        return f"{column_name} < {value}"
    elif operator == 'is':
        return f"{column_name} = '{value}'"
    elif operator == 'is not':
        return f"{column_name} != '{value}'"
    elif operator == 'contains':
        return f"{column_name} LIKE '%{value}%'"
    elif operator == 'does not contain':
        return f"{column_name} NOT LIKE '%{value}%'"
    else:
        raise ValueError(f"Unsupported operator: {operator}")

def filter_invalid_conditions(conditions):
    def is_valid_condition(condition):
        return (condition.get('columns') and
                condition.get('operator') and
                condition.get('value') and
                condition['value'][0].get('query'))

    def filter_conditions(cond):
        if isinstance(cond, dict):
            if 'and' in cond:
                filtered_and = [filter_conditions(c) for c in cond['and'] if filter_conditions(c)]
                if filtered_and:
                    return {'and': filtered_and}
                else:
                    return None
            elif 'or' in cond:
                filtered_or = [filter_conditions(c) for c in cond['or'] if filter_conditions(c)]
                if filtered_or:
                    return {'or': filtered_or}
                else:
                    return None
            else:
                if is_valid_condition(cond):
                    return cond
                else:
                    return None
        return None

    return filter_conditions(conditions)


def parse_condition_to_sql(condition, table_alias='logs'):
    sql_clauses = []

    if not condition:
        return ""

    if 'and' in condition:
        clauses = [parse_condition_to_sql(cond, table_alias) for cond in condition['and']]
        sql_clauses.append(f"({' AND '.join(filter(None, clauses))})")
    elif 'or' in condition:
        clauses = [parse_condition_to_sql(cond, table_alias) for cond in condition['or']]
        sql_clauses.append(f"({' OR '.join(filter(None, clauses))})")
    else:
        column_name = condition.get('columns')
        operator = condition.get('operator')
        values = condition.get('value')

        if column_name is None or operator is None or values is None:
            return ""

        db_column_name = field_to_column_mapping.get(column_name, column_name)

        if column_name == 'email':
            db_column_name = 'users.email'
        elif column_name == 'status':
            db_column_name = 'logs.type'
        else:
            db_column_name = f"{table_alias}.{db_column_name}"

        if operator in not_allow_many_inputs:
            value = convert_value(db_column_name, values[0].get('query'))
            sql_clauses.append(get_operator_sql(db_column_name, operator, value))
        else:
            sub_clauses = [
                get_operator_sql(db_column_name, operator, convert_value(db_column_name, val.get('query')))
                for val in values
            ]
            if operator == 'is not':
                sql_clauses.append(f"({' AND '.join(filter(None, sub_clauses))})")
            else:
                sql_clauses.append(f"({' OR '.join(filter(None, sub_clauses))})")

    return ' AND '.join(filter(None, sql_clauses))


def build_raw_sql_query(conditions):
  
    valid_conditions = filter_invalid_conditions(conditions)
    where_clause = parse_condition_to_sql(valid_conditions)
    sql_query = f"""
        SELECT logs.*, users.email AS user_email
        FROM logs 
        LEFT JOIN users ON logs.user_id = users.id
        {where_clause and f"WHERE {where_clause}"}
    """
    return sql_query