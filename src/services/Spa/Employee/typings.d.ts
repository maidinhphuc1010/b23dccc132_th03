declare module EmployeeModule {
    export interface Employee {
      id: string;
      name: string;
      maxClientsPerDay: number;
      workSchedule: { [day: string]: string };
    }
  }
  