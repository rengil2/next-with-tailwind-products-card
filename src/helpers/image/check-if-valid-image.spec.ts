import { checkIfValidImage } from "./check-if-valid-image";

it("its false if image is null", () => {
  expect(checkIfValidImage(null)).toBeFalsy();
});

it("its false if image not in proper domain", () => {
  expect(checkIfValidImage("www.google")).toBeFalsy();
});

it("its true if image in proper domain", () => {
  expect(checkIfValidImage("images.qogita.com")).toBeTruthy();
});
