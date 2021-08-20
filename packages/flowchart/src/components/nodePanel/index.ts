/**
 * 节点面板
 * 内置多种节点，同时提供用户注册机制
 * ```ts
 *  app.executeCommand(XFlowNodeCommands.ADD_NODE.id, {
 *     beforeExec: async () => {
 *       const execArgs: NsAddNode.IExecArgs = {
 *         nodeConfig: {
 *           id: 'node1',
 *           x: 100,
 *           y: 30,
 *           width: 100,
 *           height: 40,
 *           renderKey: 'NODE1',
 *         },
 *       }
 *       return [null, execArgs]
 *     },
 *   } as NsAddNode.IConfig)
 *
 *   return app
 * ```
 */

export const CUSTOMNODE = 'customNode';
