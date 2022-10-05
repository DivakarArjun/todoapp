export interface Admin {
  adminId: string;
  email: string;
  password?: string;
  bio?: string;
  createdAt?: string;
  createdBy?: string;
  updatedBY?: string;
  status: number;
  userType: string;
}

export enum Adminstatus {
  inactive,
  active,
  blocked,
  deleted,
}

export enum QuestionTypestatus {
  string,
  date,
  option,
}
export enum Categorystatus {
  inactive,
  active,
  deleted,
}
export enum expertStatus {
  inactive,
  active,
  blocked,
}
export enum blogStatus {
  inactive,
  active,
  deleted,
}
export enum healthStatus {
  inactive,
  active,
  deleted,
}
export enum eventUserStatus {
  inactive,
  active,
  deleted,
}
export enum blogType {
  image,
  video,
}

export enum userType {
  user,
  coach,
}

export enum eventStatus {
  active,
  cancel,
  deleted,
}

export enum eventType {
  User,
  global,
  article,
  private,
}

export enum birthPlanStatus {
  inactive,
  active,
}

export enum birthQuestionType {
  boolean,
  checkbox,
  radio,
  text
}

export enum QuestionType {
  boolean,
  checkbox,
  radio,
}
export interface optionDetails {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option5: string;
  option6: string;
}

export enum groupType {
  community,
  other,
}

export enum historyType {
  login,
  other,
}

export enum memberStatus {
  inactive,
  active,
}
export enum contentType {
  termsAndCondition,
  aboutUs,
  privacyPolicy,
  helpSection,
}
export enum AdminSessionStatus {
  inactive,
  active,
  deleted,
}
export enum newsStatus {
  inactive,
  active,
  deleted,
}
