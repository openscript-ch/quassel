// Theme
import "@mantine/core/styles.css";
import "@mantine/core/styles/global.css";
import "@mantine/core/styles/ScrollArea.css";
import "@mantine/core/styles/UnstyledButton.css";
import "@mantine/core/styles/VisuallyHidden.css";
import "@mantine/core/styles/Paper.css";
import "@mantine/core/styles/Popover.css";
import "@mantine/core/styles/CloseButton.css";
import "@mantine/core/styles/Group.css";
import "@mantine/core/styles/Loader.css";
import "@mantine/core/styles/Overlay.css";
import "@mantine/core/styles/Menu.css";
import "@mantine/core/styles/ModalBase.css";
import "@mantine/core/styles/Modal.css";
import "@mantine/core/styles/Input.css";
import "@mantine/core/styles/InlineInput.css";
import "@mantine/core/styles/Flex.css";
import "@mantine/core/styles/Anchor.css";
import "@mantine/core/styles/AppShell.css";
import "@mantine/core/styles/Button.css";
import "@mantine/core/styles/Checkbox.css";
import "@mantine/core/styles/Container.css";
import "@mantine/core/styles/Divider.css";
import "@mantine/core/styles/NavLink.css";
import "@mantine/core/styles/PasswordInput.css";
import "@mantine/core/styles/Table.css";
import "@mantine/core/styles/Text.css";
import "@mantine/core/styles/Title.css";
import "@mantine/core/styles/ActionIcon.css";
import "@mantine/core/styles/Combobox.css";
import "@mantine/core/styles/Stack.css";
import "@mantine/core/styles/Radio.css";

import "@mantine/dates/styles.css";

import "@mantine/notifications/styles.css";

export { uzhColors } from "./theme/uzh";
export { ThemeProvider, defaultTheme } from "./theme/ThemeProvider";

// custom components
export { Brand } from "./components/Brand";
export { ContentShell } from "./components/ContentShell";
export { FooterLogos } from "./components/FooterLogos";
export { Hero } from "./components/Hero";
export { ImportInput } from "./components/ImportInput";
export { ImportPreview } from "./components/ImportPreview";
export { MonthPicker } from "./components/MonthPicker";
export { ErrorDisplay } from "./components/ErrorDisplay";

// external components
export {
  Alert,
  ActionIcon,
  Anchor,
  AppShell,
  Breadcrumbs,
  Button,
  Box,
  Checkbox,
  Chip,
  Code,
  Combobox,
  Container,
  ColorInput,
  ColorSwatch,
  Divider,
  Flex,
  Affix,
  Group,
  InputError,
  InputLabel,
  Menu,
  mergeThemeOverrides,
  Modal,
  NavLink,
  Paper,
  PasswordInput,
  Radio,
  ScrollArea,
  SegmentedControl,
  Select,
  type SelectProps,
  Spoiler,
  Stack,
  Switch,
  Table,
  Text,
  Textarea,
  TextInput,
  type TextInputProps,
  NumberInput,
  Title,
  UnstyledButton,
  useCombobox,
  useMantineTheme,
} from "@mantine/core";

export { TimeInput, DateInput } from "@mantine/dates";

export { useDisclosure, useFullscreen } from "@mantine/hooks";

export { notifications, type NotificationData } from "@mantine/notifications";

export { modals } from "@mantine/modals";

export { useForm, isInRange, isNotEmpty } from "@mantine/form";

export {
  IconLogout,
  IconUsers,
  IconDashboard,
  IconDatabaseExport,
  IconFriends,
  IconLanguage,
  IconLego,
  IconCalendarWeek,
  IconMapSearch,
  IconMinus,
  IconRepeat,
  IconChevronDown,
  IconChevronUp,
  IconSelector,
  IconMaximize,
  IconMaximizeOff,
  IconFilter,
  IconPlus,
  IconReportAnalytics,
  IconX,
  IconInfoCircle,
  IconClearAll,
} from "@tabler/icons-react";

export { DSVImport, type ColumnType } from "react-dsv-import";
