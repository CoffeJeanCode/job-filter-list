export const queryAllJobs = async () =>
  await (await fetch("/data.json")).json();
