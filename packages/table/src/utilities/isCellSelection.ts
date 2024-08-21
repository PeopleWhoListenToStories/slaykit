import { CellSelection } from "@slaykit/core";

export function isCellSelection(value: unknown): value is CellSelection {
  return value instanceof CellSelection;
}
