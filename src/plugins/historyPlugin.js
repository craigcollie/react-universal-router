function update(newLocation, { meta }, isHistoryEvent) {
  const { title } = meta;
  if (!isHistoryEvent) {
    history.pushState({ page: newLocation }, title, newLocation);
  }
}

export default update;
