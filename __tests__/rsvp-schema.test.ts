import { rsvpSchema } from "@/lib/rsvp-schema";

describe("rsvpSchema", () => {
  it("accepte une réponse valide présent", () => {
    const result = rsvpSchema.safeParse({
      name: "Famille Amoussou",
      attendance: "yes",
      guests: "2",
      message: "",
    });
    expect(result.success).toBe(true);
  });

  it("accepte une réponse valide absent", () => {
    const result = rsvpSchema.safeParse({
      name: "Jean Dupont",
      attendance: "no",
      guests: "1",
      message: "Avec vous de tout cœur",
    });
    expect(result.success).toBe(true);
  });

  it("rejette un nom vide", () => {
    const result = rsvpSchema.safeParse({
      name: "",
      attendance: "yes",
      guests: "1",
      message: "",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain("name");
  });

  it("rejette une attendance invalide", () => {
    const result = rsvpSchema.safeParse({
      name: "Test",
      attendance: "maybe",
      guests: "1",
      message: "",
    });
    expect(result.success).toBe(false);
  });
});
