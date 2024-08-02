export async function fetchProjects() {
  return [
    { id: 1, name: "Project Alpha", status: "Active" },
    { id: 2, name: "Project Beta", status: "Inactive" },
  ];
}

export async function fetchProjectDetails(id) {
  const project = { id, name: `Project ${id}` };
  const bugs = [
    { id: 1, title: "Bug 1", status: "Open", severity: "High" },
    { id: 2, title: "Bug 2", status: "Closed", severity: "Medium" },
  ];
  return { project, bugs };
}
