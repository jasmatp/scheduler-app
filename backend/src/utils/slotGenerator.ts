export const generateSlots = (startTime: string, endTime: string): string[] => {
  const slots: string[] = [];

  const start = new Date();
  const end = new Date();

  const [sh, sm] = startTime.split(":").map(Number);

  const [eh, em] = endTime.split(":").map(Number);

  start.setHours(sh, sm, 0, 0);
  end.setHours(eh, em, 0, 0);

  while (start < end) {
    slots.push(
      start.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );

    start.setMinutes(start.getMinutes() + 30);
  }

  return slots;
};
