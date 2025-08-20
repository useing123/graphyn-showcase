# PennyWise UI Migration Plan: NativeWind to Tamagui

## 1. Introduction

This document outlines the strategy for migrating the PennyWise application's UI from NativeWind/Tailwind to Tamagui. The goal is to leverage Tamagui's performance benefits and rich component library while ensuring the application continues to meet the product specifications defined in `instructions.md`.

## 2. Analysis of Existing Codebase

### 2.1. Dependencies

The `package.json` file confirms the presence of both `nativewind` and `tailwindcss`, as well as `tamagui`. This indicates that a partial setup for Tamagui might already be in place, which could simplify the migration process.

### 2.2. Tailwind Configuration

The `tailwind.config.js` file is configured to scan for Tailwind classes in the `app/` and `components/` directories. The configuration includes custom colors that will need to be migrated to the Tamagui theme.

### 2.3. Component Analysis

The `components/` directory currently contains the following components:

-   **`CategoryIcon.tsx`**: A simple component that does not use NativeWind. It can be easily adapted to use Tamagui's `Icon` components.
-   **`TransactionCard.tsx`**: This component already uses some Tamagui components (`XStack`, `YStack`, `Text`) but also relies on inline styles for layout and background color. This component will be a good starting point for the migration.

## 3. Migration Strategy

The migration will be performed in a phased approach to minimize disruption and allow for incremental testing.

### 3.1. Phase 1: Setup and Configuration

1.  **Remove NativeWind and Tailwind:** Uninstall the `nativewind` and `tailwindcss` packages and remove the Tailwind configuration from `tailwind.config.js`.
2.  **Configure Tamagui Theme:** Create a comprehensive theme in `tamagui.config.ts` that includes the custom colors from the old `tailwind.config.js` and aligns with the design guidelines in `instructions.md`.
3.  **Update Babel Configuration:** Ensure that the `babel.config.js` file is correctly configured with the `@tamagui/babel-plugin`.

### 3.2. Phase 2: Component Migration

The migration will proceed on a component-by-component basis, starting with the most-used components.

1.  **`TransactionCard.tsx`:**
    *   Replace the `Pressable` component with a Tamagui `Card`.
    *   Replace inline styles with Tamagui's style props (e.g., `padding`, `marginBottom`, `backgroundColor`, `borderRadius`).
    *   Ensure the layout and styling match the original design.
2.  **`CategoryIcon.tsx`:**
    *   Replace the `FontAwesome` icon with a Tamagui `Icon` from `@tamagui/lucide-icons`.
    *   Map the `category` prop to the appropriate icon.
3.  **New Components:**
    *   Create new Tamagui components for the UI elements described in `instructions.md`, such as buttons, inputs, and lists.
    *   Prioritize the components needed for the Dashboard Interface.

### 3.3. Phase 3: Screen Migration

Once the core components have been migrated, the focus will shift to the application screens.

1.  **`app/(tabs)/index.tsx` (Dashboard):**
    *   Replace the existing layout with Tamagui's `YStack` and `XStack` components.
    *   Integrate the new Tamagui components for the balance display, transaction list, and quick add button.
2.  **Other Screens:**
    *   Migrate the remaining screens (`add.tsx`, `camera.tsx`, `chat.tsx`, `transactions.tsx`) to use Tamagui components.

## 4. Addressing "context7"

The term "context7" was mentioned in the initial request, but its meaning within the context of this project is unclear. The `Context7` MCP server provided information about "Context Engineering" and the "Model Context Protocol," but these do not seem to be directly related to UI development in React Native.

**Action Item:** Ask the user for clarification on what "context7" means and how it should be implemented in the PennyWise application.

## 5. Conclusion

This migration plan provides a clear path for transitioning the PennyWise application from NativeWind to Tamagui. By following this plan, we can ensure a smooth and efficient migration that results in a more performant and maintainable codebase.