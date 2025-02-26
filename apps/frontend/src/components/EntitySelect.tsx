import { ActionIcon, Combobox, Group, IconPlus, IconX, ScrollArea, TextInput, TextInputProps, useCombobox } from "@quassel/ui";
import { useEffect, useState } from "react";
import { i18n } from "../stores/i18n";
import { useStore } from "@nanostores/react";
import { params } from "@nanostores/i18n";
import { C } from "../configuration";

export type EntitySelectProps = Omit<TextInputProps, "value" | "onChange"> & {
  value?: number;
  onChange?: (value?: number) => void;
  onAddNew?: (value: string) => Promise<number>;
};

type StringKeys<T> = { [K in keyof T]-?: T[K] extends string ? K : never }[keyof T];

type Props<T extends { id: number }> = Omit<EntitySelectProps, "data"> & {
  data?: T[];
  renderOption?: (item: T) => void;
  onAddNew?: (value: string) => void;
  labelKey: StringKeys<T>;
};

const customValueKey = "CUSTOM_VALUE";

const messages = i18n("entitySelect", {
  actionCreateNew: params('Create new "{value}"'),
});

export function EntitySelect<T extends { id: number }>({ value, onChange, data, labelKey, onAddNew, renderOption, ...rest }: Props<T>) {
  const t = useStore(messages);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [searchValue, setSearchValue] = useState("");
  const [availableHeight, setAvailbleHeight] = useState(C.ui.maxDropdownHeight);

  const shouldFilterOptions = !data?.some((item) => item[labelKey] === searchValue);
  const filteredOptions =
    (shouldFilterOptions
      ? data?.filter((item) => (item[labelKey] as string)?.toLowerCase().includes(searchValue.toLowerCase().trim()))
      : data) ?? [];

  const options = filteredOptions?.map((item) => (
    <Combobox.Option key={item.id} value={item.id.toString()}>
      {renderOption?.(item) ?? (item[labelKey] as string)}
    </Combobox.Option>
  ));

  useEffect(() => {
    if (value && data) {
      const index = data.findIndex((item) => item.id === value);
      if (index !== -1) {
        setSearchValue(data[index][labelKey] as string);
        combobox.selectOption(index);
      }
    }
  }, [value, data]);

  useEffect(() => {
    if (shouldFilterOptions) combobox.selectFirstOption();
  }, [searchValue]);

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={async (value) => {
        let id: number;
        if (value === customValueKey) {
          id = await onAddNew!(searchValue);
        } else {
          id = +value;
        }
        onChange?.(id);
        combobox.closeDropdown();
      }}
      middlewares={{
        size: {
          apply: ({ availableHeight }) => {
            setAvailbleHeight(availableHeight - 15);
          },
        },
      }}
    >
      <Combobox.Target>
        <TextInput
          value={searchValue}
          onChange={({ target: { value } }) => {
            setSearchValue(value);

            if (value === "") {
              combobox.resetSelectedOption();
              onChange?.(-1);
            }
          }}
          readOnly={value !== -1}
          rightSection={
            <ActionIcon
              variant="subtle"
              color="gray"
              size="sm"
              onClick={() => {
                combobox.resetSelectedOption();
                onChange?.(-1);

                setSearchValue("");
              }}
            >
              <IconX />
            </ActionIcon>
          }
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
          {...rest}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize type="scroll" mah={availableHeight && Math.min(availableHeight, C.ui.maxDropdownHeight)}>
            {onAddNew && !options?.length && (
              <Combobox.Option value={customValueKey}>
                <Group gap="xs">
                  <IconPlus />
                  {t.actionCreateNew({ value: searchValue })}
                </Group>
              </Combobox.Option>
            )}
            {options}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
