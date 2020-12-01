import { useState, SyntheticEvent, ChangeEvent } from "react";
import suggestList from "../../groceries";
import styles from "./AddGrocery.module.scss";

const AddGrocery = ({ addItem }: AddGroceryProps) => {
  const [newItem, setNewItem] = useState("");
  const [hasFocus, setHasFocus] = useState(
    document.activeElement === document.querySelector("#add-grocery-input")
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const _input = e.target.value;
    setNewItem(_input);
  };

  const handleSuggestAdd = (value: string) => {
    addItem(value);
    setNewItem("");
    (document.querySelector("#add-grocery-input") as HTMLInputElement).focus();
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          className={styles.input}
          id="add-grocery-input"
          onBlur={() => setHasFocus(false)}
          onFocus={() => setHasFocus(true)}
          onChange={handleChange}
          placeholder="Start typing; enter to add ..."
          type="text"
          value={newItem}
        />
      </form>
      {hasFocus && newItem.length > 1 && (
        <div className={styles["suggest-list"]}>
          <ul>
            {suggestList
              .filter((item) =>
                item.split(" ").some((item) => item.startsWith(newItem))
              )
              .map((item) => (
                <li key={item} onMouseDown={() => handleSuggestAdd(item)}>
                  {item}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

interface AddGroceryProps {
  addItem: Function;
}

export default AddGrocery;
