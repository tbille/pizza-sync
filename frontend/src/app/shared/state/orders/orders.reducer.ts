import { ActionReducer, Action } from '@ngrx/store';

import { ordersState } from './orders.initial-state';
import { IOrderCommon, IOrdersTable } from './orders.interface';

export class Orders {
  private static reducerName = 'ORDERS_REDUCER';

  public static reducer(ordersTbl = ordersState(), {type, payload}: Action) {
    if (typeof Orders.mapActionsToMethod[type] === 'undefined') {
      return ordersTbl;
    }

    return Orders.mapActionsToMethod[type](ordersTbl, type, payload);
  }

  // tslint:disable-next-line:member-ordering
  public static LOAD_ORDERS_SUCCESS = `${Orders.reducerName}_LOAD_ORDERS_SUCCESS`;
  private static loadOrdersSuccess(ordersTbl: IOrdersTable, type, payload: IOrderCommon) {
    return Object.assign(<IOrdersTable>{}, ordersTbl, payload);
  }

  // tslint:disable-next-line:member-ordering
  public static ADD_ORDER = `${Orders.reducerName}_ADD_ORDER`;

  // tslint:disable-next-line:member-ordering
  public static ADD_ORDER_SUCCESS = `${Orders.reducerName}_ADD_ORDER_SUCCESS`;
  private static addOrderSuccess(ordersTbl: IOrdersTable, type, payload: IOrderCommon) {
    return Object.assign(<IOrdersTable>{}, ordersTbl, <IOrdersTable>{
      byId: Object.assign({}, ordersTbl.byId, { [payload.id]: payload }),
      allIds: [...ordersTbl.allIds, payload.id]
    });
  }

  // tslint:disable-next-line:member-ordering
  public static REMOVE_ORDER = `${Orders.reducerName}_REMOVE_ORDER`;
  private static removeOrder(ordersTbl: IOrdersTable, type, payload: IOrderCommon) {
    return Object.assign(<IOrdersTable>{}, ordersTbl, <IOrdersTable>{
      byId: Object.assign({}, ordersTbl.byId, {
        [payload.id]: Object.assign({},
          ordersTbl.byId[payload.id],
          { isBeingRemoved: true }
        )
      })
    });
  }

  // tslint:disable-next-line:member-ordering
  public static REMOVE_ORDER_SUCCESS = `${Orders.reducerName}_REMOVE_ORDER_SUCCESS`;
  private static removeOrderSuccess(ordersTbl: IOrdersTable, type, payload: IOrderCommon) {
     const ordersTmp = Object.assign(<IOrdersTable>{}, ordersTbl, <IOrdersTable>{
      byId: Object.assign({}, ordersTbl.byId),
      allIds: ordersTbl.allIds.filter(orderId => orderId !== payload.id)
    });

    delete ordersTmp.byId[payload.id];

    return ordersTmp;
  }

  // ---------------------------------------------------------------

  // tslint:disable-next-line:member-ordering
  private static mapActionsToMethod = {
    [Orders.LOAD_ORDERS_SUCCESS]: Orders.loadOrdersSuccess,
    [Orders.ADD_ORDER_SUCCESS]: Orders.addOrderSuccess,
    [Orders.REMOVE_ORDER]: Orders.removeOrder,
    [Orders.REMOVE_ORDER_SUCCESS]: Orders.removeOrderSuccess
  };
}
