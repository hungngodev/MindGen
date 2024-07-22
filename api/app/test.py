def filter_invalid_conditions(conditions):
    """Filter out invalid conditions from the input."""
    def is_valid_condition(condition):
        """Check if a condition has valid 'columns', 'operator', and 'value'."""
        return (condition.get('columns') and
                condition.get('operator') and
                condition.get('value') and
                condition['value'][0].get('query'))

    def filter_conditions(cond):
        """Recursively filter conditions and maintain structure."""
        if isinstance(cond, dict):
            if 'and' in cond:
                # Recursively filter the list of 'and' conditions
                filtered_and = [filter_conditions(c) for c in cond['and'] if filter_conditions(c)]
                if filtered_and:
                    return {'and': filtered_and}
                else:
                    return None
            elif 'or' in cond:
                # Recursively filter the list of 'or' conditions
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

# Testing the function
conditions = {
    'or': [
        {
            'and': [
                {'columns': 'cost', 'operator': 'equal', 'value': [{'query': '0.55'}]},
                {'columns': '', 'operator': '', 'value': [{'query': ''}]}
            ]
        }
    ]
}

filtered_conditions = filter_invalid_conditions(conditions)
print(filtered_conditions)
