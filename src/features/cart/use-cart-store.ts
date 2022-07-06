import create, { useStore } from "zustand";
import produce from "immer";
import { persist } from "zustand/middleware";

export enum useCartStoreTypes {
  addToCart = "ADD_TO_CART",
  increment = "INCREMENT",
  decrement = "DECREMENT",
}

export type ProductQuantity = string;
export type ProductId = string;

const reducer = (
  state: Record<string, number>,
  { type, payload }: { type: useCartStoreTypes; payload: { productId: string } }
) => {
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

export const useCartStore = create(
  persist(
    (set) => ({
      productById: {},
      dispatch: (args: any) => set((state) => reducer(state, args)),
    }),
    {
      name: "cart-storage",
      getStorage: () => sessionStorage,
    }
  )
);
