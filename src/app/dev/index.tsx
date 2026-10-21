import { useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

type Task = { id: number; name: string };

export default function DbTestScreen() {
  const [items, setItems] = useState<Task[]>([]);
  const [name, setName] = useState("");

  return (
    <View style={{ flex: 1, padding: 5, gap: 3 }}>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 12,
          padding: 3,
        }}
        placeholder="Название задачи"
        value={name}
        onChangeText={setName}
      />
      <Button title="Добавить" />
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <Pressable style={{ padding: 2 }}>
            <Text>
              {item.id}. {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
