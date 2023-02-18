// import { createContext, useReducer } from "react";

// const initialState = {
//   project: [],
// };

// export const projectsReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_PROJECTS":
//       return {
//         ...state,
//         projects: action.payload,
//       };
//     case "CREATE_PROJECT":
//       return {
//         ...state,
//         projects: [action.payload, ...state.projects],
//       };
//     default:
//       return state;
//   }
// };

// export const ProjectContext = createContext();

// export const ProjectContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(projectsReducer, initialState);
//   return (
//     <ProjectContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </ProjectContext.Provider>
//   );
// };

import { createContext, useReducer } from "react";

const initialState = {
  projects: [],
};

const projectsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return {
        ...state,
        projects: action.payload,
      };
    case "CREATE_PROJECT":
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
    default:
      return state;
  }
};

export const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, initialState);

  return (
    <ProjectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};
