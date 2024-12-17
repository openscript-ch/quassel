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

import "@mantine/dates/styles.css";

import "@mantine/notifications/styles.css";

export { ThemeProvider } from "./theme/ThemeProvider";

// custom ui helpers
export { formatDate, getTime, getDateFromTimeAndWeekday, getNext } from "./utils/date";

// custom components
export { Brand } from "./components/Brand";
export { ImportInput } from "./components/ImportInput";
export { ImportPreview } from "./components/ImportPreview";
export { MonthPicker } from "./components/MonthPicker";

// external components
export {
  ActionIcon,
  Anchor,
  AppShell,
  Button,
  Checkbox,
  Combobox,
  Container,
  ColorInput,
  ColorSwatch,
  Divider,
  Flex,
  Group,
  InputError,
  Modal,
  NavLink,
  Paper,
  PasswordInput,
  Select,
  type SelectProps,
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

export { TimeInput } from "@mantine/dates";

export { useDisclosure } from "@mantine/hooks";

export { notifications } from "@mantine/notifications";

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
} from "@tabler/icons-react";

export { uzhColors } from "./theme/uzh";
export { DSVImport, type ColumnType } from "react-dsv-import";
