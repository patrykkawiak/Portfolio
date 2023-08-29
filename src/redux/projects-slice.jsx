import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject(state, action) {
      state.projects.push(action.payload);
    },
    replaceProjects(state, action) {
      state.projects = action.payload;
    },
    deleteProject(state, action) {
      const projectID = action.payload;
      const project = state.projects.filter((pr) => pr.id !== projectID);
      state.projects = project;
    
    }
  },
});

export default projectsSlice;

export const projectsSliceActions = projectsSlice.actions;
