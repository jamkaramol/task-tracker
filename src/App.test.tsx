import React from 'react';
import { render, screen, fireEvent } from './app/test.util';
import App from './App';
import { SWIM_LANE_TYPES } from './app/constants';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const wentWellData = [
  { "id": 1635663997394, "details": "To test min width with the long text", "type": "went_well", "likes": 0, "comments": [] },
  { "id": 1635664256448, "details": "a", "type": "went_well", "likes": 0, "comments": [] }
];

const preloadedState = {
  taskDetails: {
    [SWIM_LANE_TYPES.WENT_WELL]: wentWellData,
    [SWIM_LANE_TYPES.TO_IMPROVE]: [],
    [SWIM_LANE_TYPES.ACTION_ITEMS]: [],
  }
};

describe('App: Task Tracker app', () => {
  test(`It should have ${SWIM_LANE_TYPES.WENT_WELL}`, () => {
    render(<App />);
    const wentWell = screen.getByTestId(SWIM_LANE_TYPES.WENT_WELL);
    expect(wentWell).toBeInTheDocument();
  });

  test(`It should have ${SWIM_LANE_TYPES.TO_IMPROVE}`, () => {
    render(<App />);
    const toImprove = screen.getByTestId(SWIM_LANE_TYPES.TO_IMPROVE);
    expect(toImprove).toBeInTheDocument();
  });

  test(`It should have ${SWIM_LANE_TYPES.ACTION_ITEMS}`, () => {
    render(<App />);
    const actionItems = screen.getByTestId(SWIM_LANE_TYPES.ACTION_ITEMS);
    expect(actionItems).toBeInTheDocument();
  });

  test("It should have 3 add button to add task for each swim lane", () => {
    render(<App />);
    const addButton = screen.getAllByTestId(/add-button/i);
    expect(addButton.length).toBe(3);
  });
});


describe('App should load the tasks', () => {

  test('It should have a task list', () => {
    render(<App />, { preloadedState });
    const taskDetails = screen.getAllByTestId("task-details");
    expect(taskDetails.length).toBe(2);
  });

  test('Should able to delete the task', () => {
    render(<App />, { preloadedState });
    userEvent.click(screen.getByTestId("delete-task1635663997394"));
    const taskDetails = screen.getAllByTestId("task-details");
    expect(taskDetails.length).toBe(1);
  });

  test('Should able to add the task', () => {
    render(<App />, { preloadedState, });
    act(() => {
      userEvent.click(screen.getByTestId("add-button" + SWIM_LANE_TYPES.TO_IMPROVE));
    });
    expect(screen.getByTestId("task-text-area-id")).toBeInTheDocument();
    act(() => {
      fireEvent.change(screen.getByTestId("task-text-area-id"), {
        target: { value: "New task from test suit" }
      });
    });
    act(() => {
      userEvent.click(screen.getByTestId("submit-task"));
    })
    const taskDetails = screen.getAllByTestId("task-details");
    expect(taskDetails.length).toBe(3);
  });

  test('Should able to update the task', () => {
    render(<App />, { preloadedState, });
    act(() => {
      userEvent.click(screen.getByTestId("update-task1635664256448"));
    });
    expect(screen.getByTestId("task-text-area-id")).toBeInTheDocument();
    act(() => {
      fireEvent.change(screen.getByTestId("task-text-area-id"), {
        target: { value: "Task updated using test suit" }
      });
    });
    act(() => {
      userEvent.click(screen.getByTestId("submit-task"));
    })
    const taskDetails = screen.getByText("Task updated using test suit");
    expect(taskDetails).toBeInTheDocument();
  });

  test('Should able to cancel the add task operation', () => {
    render(<App />, { preloadedState, });
    act(() => {
      userEvent.click(screen.getByTestId("add-button" + SWIM_LANE_TYPES.TO_IMPROVE));
    });
    expect(screen.getByTestId("task-text-area-id")).toBeInTheDocument();
    act(() => {
      fireEvent.change(screen.getByTestId("task-text-area-id"), {
        target: { value: "New task from test suit" }
      });
    });
    act(() => {
      userEvent.click(screen.getByTestId("cancel-task"));
    })
    const taskDetails = screen.getAllByTestId("task-details");
    expect(taskDetails.length).toBe(2);
  });

  test('Should able to like the task', () => {
    render(<App />, { preloadedState, });
    act(() => {
      userEvent.click(screen.getByTestId("like1635663997394"));
    });
    const taskDetails = screen.getByTestId("like-count1635663997394");
    expect(taskDetails.innerHTML).toBe("1");
  });

});