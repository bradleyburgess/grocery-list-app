import { MouseEvent } from "react";
import classnames from "classnames";
import styles from "./GroceryList.module.scss";

const GroceryList = ({
  list,
  checkItem,
  removeItem,
  removeAllChecked,
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
      {checkedItems && (
        <button
          onClick={removeAllChecked}
          className={styles["button_remove-all"]}
        >
          Delete all checked items
        </button>
      )}
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
    <li
      className={classnames(styles.li, { [styles.checked]: item.checked })}
      onClick={() => checkItem(item.id)}
    >
      {item.value}
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
}

export interface GroceryListItemInterface {
  value: string;
  id: string;
  checked: boolean;
}

export default GroceryList;
