import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  applyMiddleware,
  legacy_createStore as createStore,
  type Action,
  type Middleware,
} from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import { thunk, ThunkAction, type ThunkDispatch } from 'redux-thunk';
import { rootReducer } from './rootRecucer';

// 判断当前是否为开发环境
const isDev = true;

// 默认放置 开发环境 + 生产环境共用的中间件
const middleware: Middleware[] = [thunk];
if (isDev) {
  // 初始化一个日志中间件
  const logger = createLogger();
  // 追加仅开发环境使用的中间件
  middleware.push(logger);
}

const enhancer = applyMiddleware(...middleware);

export const store = createStore(rootReducer, undefined, enhancer);

export const persistor = persistStore(store);

// 根状态类型
export type RootState = ReturnType<typeof store.getState>;
// 原来定义的AppDispatch这个类型 只满足同步dispatch的场景
// export type AppDispatch = () => typeof store.dispatch;
// 我们集成redux-thunk后 我们需要考虑将AppDispatch满足多场景（同步、异步）需求
// 借助redux-thunk提供的工具类型 ThunkDispatch<根状态类型，额外的参数类型，Action类型>

export type AppDispatch = ThunkDispatch<RootState, undefined, Action>;
export type AppThunkAction = ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  Action
>;

export interface AppAction<P> extends Action {
  payload?: P;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
