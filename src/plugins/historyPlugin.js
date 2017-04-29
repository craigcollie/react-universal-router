/* @name historyPlugin
 * @description Adds push state functionality for client-side history
 */
function historyPlugin(newLocation, { meta }, isHistoryEvent) {
  const { title } = meta;
  if (!isHistoryEvent) {
    history.pushState({ page: newLocation }, title, newLocation);
  }
}

export default historyPlugin;
