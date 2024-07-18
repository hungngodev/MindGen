import { Column } from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";
import { useFieldArray } from "react-hook-form";
import { BooleanNode } from "./boolean-node";
import {
  DownArrow,
  MinusButton,
  PlusButton,
  StraightLine,
  UpArrow,
} from "./line";

interface NestedBooleanNodeProps<TData, TValue> {
  columns: Column<TData, TValue>[];
  control: any;
  remove: () => void;
  index: number;
  outerLevel: any;
}

export const NestedBooleanNode = <TData, TValue>({
  columns,
  control,
  remove,
  index,
  outerLevel,
}: NestedBooleanNodeProps<TData, TValue>) => {
  const {
    fields: fieldsNested,
    remove: removeNested,
    append: appendNested,
    swap: swapNested,
  } = useFieldArray({
    control,
    name: `or.${index}.and` as `or.${number}.and`,
  });

  return (
    <motion.div className="ml-10 flex flex-col">
      {fieldsNested.map((item, nestedIndex) => {
        const straightLineLength =
          (nestedIndex === fieldsNested.length - 1
            ? 0
            : outerLevel.and[nestedIndex].value.length) +
          (outerLevel.and[nestedIndex].operator !== "" ? 1 : 0);
        return (
          <motion.section
            key={item.id + "sectionInnerWrapper"}
            layout
            animate="open"
            exit="collapsed"
            className="relative z-0"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{
              duration: 0.5,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
          >
            <div className="flex">
              <BooleanNode
                key={item.id + "innerBooleanNode"}
                outerIndex={index}
                nestedIndex={nestedIndex}
                id={item.id}
                openInput={outerLevel.and[nestedIndex].operator !== ""}
                control={control}
                columns={columns}
              >
                <div className="flex items-center gap-2">
                  <section
                    onClick={() => {
                      removeNested(nestedIndex);
                      if (outerLevel.and.length === 0) remove();
                    }}
                    className="ml-2 w-min cursor-pointer"
                  >
                    <MinusButton text="" />
                  </section>
                  <section
                    onClick={() => {
                      if (nestedIndex !== fieldsNested.length - 1) {
                        swapNested(nestedIndex, nestedIndex + 1);
                      }
                    }}
                  >
                    <DownArrow
                      disabled={nestedIndex === fieldsNested.length - 1}
                    />
                  </section>
                  <section
                    onClick={() => {
                      if (nestedIndex !== 0) {
                        swapNested(nestedIndex, nestedIndex - 1);
                      }
                    }}
                  >
                    <UpArrow disabled={nestedIndex === 0} />
                  </section>
                </div>
              </BooleanNode>
            </div>
            <motion.div
              key={item.id + index + "InnerLine"}
              className="relative left-[10%]"
              layout
            >
              <AnimatePresence key={item.id + "Animate"}>
                {Array.from(
                  {
                    length: straightLineLength,
                  },
                  (_, index) => (
                    <motion.div
                      key={item.id + index + "InnerLine"}
                      layout
                      className="relative left-[10%] -z-10"
                    >
                      <StraightLine
                        index={item.id + index + "InnerLineIndex"}
                      />
                      {index == Math.floor((straightLineLength - 1) / 2) &&
                        nestedIndex !== fieldsNested.length - 1 && (
                          <motion.h4
                            layout
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                              open: { opacity: 1, height: "auto" },
                              collapsed: { opacity: 0, height: 0 },
                            }}
                            transition={{
                              duration: 0.5,
                              ease: [0.04, 0.62, 0.23, 0.98],
                            }}
                            className={`absolute left-2  focus:outline-none ${(straightLineLength - 1) % 2 !== 0 ? "top-[3.25rem]" : "top-5"}`}
                          >
                            And
                          </motion.h4>
                        )}
                    </motion.div>
                  ),
                )}
              </AnimatePresence>
            </motion.div>
          </motion.section>
        );
      })}
      <div
        className="relative left-[20%] z-10 mt-2 w-min "
        onClick={() =>
          appendNested({
            columns: "",
            operator: "",
            value: [{ query: "" }],
          })
        }
      >
        <PlusButton text={"And"} />
      </div>
    </motion.div>
  );
};
