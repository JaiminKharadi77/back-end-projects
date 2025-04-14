"use client";
import BlogList from "./BlogList"; // Import the BlogList component
import { Provider } from "react-redux";
import store from "./store/store";

export default function Home() {
  return (
    <main>
      <Provider store={store}>
        <BlogList />
      </Provider>
    </main>
  );
}
