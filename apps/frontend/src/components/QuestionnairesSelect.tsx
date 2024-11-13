import { Checkbox, Table } from "@quassel/ui";
import { components } from "../api.gen";

type QuestionnairesSelectProps = {
  value: number[];
  onChange: (participantIds: number[]) => void;
  questionnaires: components["schemas"]["QuestionnaireResponseDto"][];
};

export function QuestionnairesSelect({ questionnaires, value, onChange }: QuestionnairesSelectProps) {
  return (
    <Table>
      <Table.Caption>Questionnaires</Table.Caption>
      <Table.Thead>
        <Table.Tr>
          <Table.Th></Table.Th>
          <Table.Th>Id</Table.Th>
          <Table.Th>Title</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {questionnaires?.map((q) => (
          <Table.Tr key={q.id}>
            <Table.Td>
              <Checkbox
                aria-label="Select row"
                checked={value.includes(q.id)}
                onChange={(event) => onChange(event.currentTarget.checked ? [...value, q.id] : value.filter((id) => id !== q.id))}
              />
            </Table.Td>
            <Table.Td>{q.id}</Table.Td>
            <Table.Td>{q.title}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
