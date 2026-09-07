"use client";

import { Button, Group, Paper, Text } from "@mantine/core";

export function MantineDemo() {
  return (
    <Paper withBorder p="md" radius="md">
      <Text size="sm" fw={600} mb="xs">
        Mantine components
      </Text>
      <Group>
        <Button variant="filled" size="xs">
          Filled
        </Button>
        <Button variant="outline" size="xs">
          Outline
        </Button>
      </Group>
    </Paper>
  );
}
