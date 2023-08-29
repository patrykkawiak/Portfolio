import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./form-slice";
import projectsSlice from "./projects-slice";

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    projects: projectsSlice.reducer,
  },
});

export default store;
