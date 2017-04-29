/* @name historyPlugin
 * @description Adds push state functionality for client-side history
 */
function historyPlugin(newLocation, { meta }, isHistoryEvent) {
  if (!isHistoryEvent && meta) {
    const { title } = meta;
    history.pushState({ page: newLocation }, title, newLocation);
  }
}

export default historyPlugin;
