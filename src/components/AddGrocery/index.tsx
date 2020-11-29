import { useState, SyntheticEvent, ChangeEvent } from "react";
import styles from "./AddGrocery.module.scss";

const AddGrocery = ({ addItem }: AddGroceryProps) => {
  const [newItem, setNewItem] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const _input = e.target.value;
    setNewItem(_input);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    addItem(newItem);
    setNewItem("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        autoComplete="off"
        className={styles.input}
        id="add-grocery-input"
        onChange={handleChange}
        placeholder="Start typing; enter to add ..."
        type="text"
        value={newItem}
      />
    </form>
  );
};

interface AddGroceryProps {
  addItem: Function;
}

export default AddGrocery;
