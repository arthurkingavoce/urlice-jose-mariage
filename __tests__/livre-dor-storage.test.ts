import { saveMessage, getMessages } from "@/components/livre-dor";

describe("livre d'or localStorage", () => {
  beforeEach(() => localStorage.clear());

  it("saveMessage stocke un message", () => {
    saveMessage({ name: "Marie", text: "Félicitations !" });
    const msgs = getMessages();
    expect(msgs).toHaveLength(1);
    expect(msgs[0].name).toBe("Marie");
    expect(msgs[0].text).toBe("Félicitations !");
  });

  it("getMessages retourne [] si vide", () => {
    expect(getMessages()).toEqual([]);
  });

  it("plusieurs messages sont empilés", () => {
    saveMessage({ name: "A", text: "Message A" });
    saveMessage({ name: "B", text: "Message B" });
    expect(getMessages()).toHaveLength(2);
  });
});
