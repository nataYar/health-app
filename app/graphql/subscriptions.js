/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLog = /* GraphQL */ `
  subscription OnCreateLog($filter: ModelSubscriptionLogFilterInput) {
    onCreateLog(filter: $filter) {
      id
      userID
      date
      calories
      protein
      carbs
      fats
      caloriesGoal
      weightGoal
      weight
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLog = /* GraphQL */ `
  subscription OnUpdateLog($filter: ModelSubscriptionLogFilterInput) {
    onUpdateLog(filter: $filter) {
      id
      userID
      date
      calories
      protein
      carbs
      fats
      caloriesGoal
      weightGoal
      weight
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLog = /* GraphQL */ `
  subscription OnDeleteLog($filter: ModelSubscriptionLogFilterInput) {
    onDeleteLog(filter: $filter) {
      id
      userID
      date
      calories
      protein
      carbs
      fats
      caloriesGoal
      weightGoal
      weight
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onCreateExercise(filter: $filter) {
      id
      userID
      exercise
      duration
      date
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateExercise = /* GraphQL */ `
  subscription OnUpdateExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onUpdateExercise(filter: $filter) {
      id
      userID
      exercise
      duration
      date
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteExercise = /* GraphQL */ `
  subscription OnDeleteExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onDeleteExercise(filter: $filter) {
      id
      userID
      exercise
      duration
      date
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      nickname
      email
      Exercises {
        nextToken
        __typename
      }
      Logs {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      nickname
      email
      Exercises {
        nextToken
        __typename
      }
      Logs {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      nickname
      email
      Exercises {
        nextToken
        __typename
      }
      Logs {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
