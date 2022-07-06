import create, { useStore } from "zustand";
import produce from "immer";
import { persist } from "zustand/middleware";

export enum useCartStoreTypes {
  addToCart = "ADD_TO_CART",
  increment = "INCREMENT",
  decrement = "DECREMENT",
}

interface State {
  productById: Record<string, number>;
}
type DispatchType = { type: useCartStoreTypes; payload: { productId: string } };

const reducer = (state: State, { type, payload }: DispatchType) => {
  switch (type) {
    case useCartStoreTypes.addToCart:
      return produce(state, (draft) => {
        draft.productById[payload.productId] = 1;
      });
    case useCartStoreTypes.increment:
      return produce(state, (draft) => {
        draft.productById[payload.productId] =
          state.productById[payload.productId] + 1;
      });
    case useCartStoreTypes.decrement:
      return produce(state, (draft) => {
        if (draft.productById[payload.productId] <= 1) {
          delete draft.productById[payload.productId];
        } else {
          draft.productById[payload.productId] =
            state.productById[payload.productId] - 1;
        }
      });
  }
};

export const useCartStore = create<
  {
    productById: Record<string, number>;
    dispatch: (action: DispatchType) => void;
  },
  [["zustand/persist", { siteId: string; email: string; siteUrl: string }]]
>(
  persist(
    (set) => ({
      productById: {},
      dispatch: (args: any) => set((state: State) => reducer(state, args)),
    }),
    {
      name: "cart-storage",
      getStorage: () => sessionStorage,
    }
  )
);
