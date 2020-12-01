import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import AppContainer from "./AppContainer";
import Header from "./Header";
import Footer from "./Footer";
import AddGrocery from "./AddGrocery";
import GroceryList, { GroceryListItemInterface } from "./GroceryList";

const App = () => {
  const [groceryList, setGroceryList] = useState<GroceryListItemInterface[]>(
    []
  );

  const handleRemoveAllChecked = () => {
    const newList = groceryList.filter((item) => !item.checked);
    setGroceryList(newList);
    // (document.querySelector("#add-grocery-input") as HTMLElement)!.focus();
    localStorage.setItem("groceryList", JSON.stringify(newList));
  };

  const handleClearAll = () => {
    setGroceryList([]);
  };

  const handleAddItem = (value: string) => {
    value = value.toLowerCase().trim();
    // Check for empty input
    if (!value) return;
    const _checkedList = groceryList
      .filter((item) => item.checked)
      .map((item) => item.value);
    const _uncheckedList = groceryList
      .filter((item) => !item.checked)
      .map((item) => item.value);
    let newList;
    if (_uncheckedList.includes(value)) {
      return;
    } else if (_checkedList.includes(value)) {
      newList = groceryList.map((item) => {
        if (item.value === value) item.checked = false;
        return item;
      });
      setGroceryList(newList);
    } else {
      const newItem = { value, id: uuid(), checked: false };
      newList = [...groceryList, newItem];
      setGroceryList(newList);
    }
    localStorage.setItem("groceryList", JSON.stringify(newList));
  };

  const handleCheckItem = (id: string) => {
    const newList = groceryList.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    setGroceryList(newList);
    localStorage.setItem("groceryList", JSON.stringify(newList));
    // (document.querySelector("#add-grocery-input") as HTMLElement)!.focus();
  };

  const handleRemoveItem = (id: string) => {
    const newList = groceryList.filter((item) => item.id !== id);
    setGroceryList(newList);
    localStorage.setItem("groceryList", JSON.stringify(newList));
    // (document.querySelector("#add-grocery-input") as HTMLElement)!.focus();
  };

  useEffect(() => {
    let _list: GroceryListItemInterface[];
    try {
      const _data = localStorage.getItem("groceryList");
      _list = _data ? JSON.parse(_data) : [];
    } catch (error) {
      console.log("Something went wrong");
      _list = [];
    }
    setGroceryList(_list);
  }, []);

  return (
    <div id="app">
      <Header />
      <AppContainer>
        <AddGrocery addItem={handleAddItem} />
        <GroceryList
          list={groceryList}
          checkItem={handleCheckItem}
          removeItem={handleRemoveItem}
          removeAllChecked={handleRemoveAllChecked}
          clearAll={handleClearAll}
        />
      </AppContainer>
      <Footer />
    </div>
  );
};

export default App;
