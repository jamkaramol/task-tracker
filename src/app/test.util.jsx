import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import taskDetailsSlice from "./taskDetailsSlice";

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        taskDetails: taskDetailsSlice,
      }, preloadedState
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}


export * from '@testing-library/react'
// override render method
export { render }