import { MouseEvent } from "react";
import classNames from "classnames";
import styles from "./GroceryList.module.scss";

const GroceryList = ({
  list,
  checkItem,
  removeItem,
  removeAllChecked,
  clearAll,
}: GroceryListProps) => {
  const checkedItems: boolean = list.some((item) => item.checked);

  return (
    <>
      {list.length === 0 && (
        <p className={styles["no-items"]}>No items added yet</p>
      )}
      <ul className={styles.ul}>
        {list!.length > 0 &&
          list!
            .filter((item) => !item.checked)
            .map((item) => (
              <GroceryListItem
                removeItem={removeItem}
                checkItem={checkItem}
                item={item}
                key={item.id}
              />
            ))}
        {list!.length > 0 &&
          list!
            .filter((item) => item.checked)
            .map((item) => (
              <GroceryListItem
                removeItem={removeItem}
                checkItem={checkItem}
                item={item}
                key={item.id}
              />
            ))}
      </ul>
      <div>
        {checkedItems && (
          <button
            onClick={removeAllChecked}
            className={classNames(
              styles.button,
              styles["button_remove-checked"]
            )}
          >
            Delete all checked items
          </button>
        )}
        {list.length > 0 && (
          <button
            onClick={clearAll}
            className={classNames(styles.button, styles["button_clear-all"])}
          >
            Clear All
          </button>
        )}
      </div>
    </>
  );
};

const GroceryListItem = ({
  item,
  removeItem,
  checkItem,
}: GroceryListItemProps) => {
  const handleRemoveClick = (e: MouseEvent) => {
    e.stopPropagation();
    removeItem(item.id);
  };

  return (
    <li className={classNames(styles.li)} onClick={() => checkItem(item.id)}>
      <span className={classNames({ [styles.checked]: item.checked })}>
        {item.value}
      </span>
      <span className={styles.delete} onClick={handleRemoveClick}>
        X
      </span>
    </li>
  );
};

interface GroceryListItemProps {
  item: GroceryListItemInterface;
  removeItem: Function;
  checkItem: Function;
}

interface GroceryListProps {
  list: GroceryListItemInterface[];
  removeItem: Function;
  checkItem: Function;
  removeAllChecked: (event: MouseEvent) => void;
  clearAll: (event: MouseEvent) => void;
}

export interface GroceryListItemInterface {
  value: string;
  id: string;
  checked: boolean;
}

export default GroceryList;
