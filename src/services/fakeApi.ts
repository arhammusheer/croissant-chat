const example = [
  {
    id: "6c967ab6-3449-4664-b006-886f05e310b1",
    name: "This is Subbaswammy. AMA",
    created_at: "2022-10-09T16:00:00.000Z",
    message_count: 10,
    background_url:
      "https://cdn.discordapp.com/attachments/785885889988919366/1028723456029769879/unknown.png",
  },
  {
    id: "ea8d2416-3f97-4aaa-9a61-002a8f2e7cb0",
    name: "Cow",
    created_at: "2022-10-09T16:00:00.000Z",
    background_url:
      "https://images.unsplash.com/photo-1556997685-309989c1aa82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80",
  },
  {
    id: "484ca30d-ddeb-4804-9b04-7118bae853aa",
    name: "Some people just say the darnest things",
    created_at: "2022-10-09T16:00:00.000Z",
  },
  {
    id: "e075f95c-56cd-4958-aafa-b980018171d3",
    name: "I'm not sure what to say",
    created_at: "2022-10-09T16:00:00.000Z",
  },
  {
    id: "b6e5fb0a-6252-4965-b9af-640c335648f2",
    name: "What is an Emergency physician’s favorite cellular organelle?",
    created_at: "2022-10-09T16:00:00.000Z",
  },
  {
    id: "3c1cf4de-930d-420c-a4c1-08964e2b18e8",
    name: "What do you call an Italian and African mosquito cross-breed?",
    created_at: "2022-10-09T16:00:00.000Z",
  },
] as {
  id: string;
  name: string;
  created_at: string;
  message_count?: number;
  background_url?: string;
}[];

export const getRooms = async () => {
  await timeout(500);
  return example;
};

export const getRoom = async (id: string) => {
  return example.find((room) => room.id === id);
};

export const createRoom = async ({}) => {
  await timeout(500);
  return;
};

const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
