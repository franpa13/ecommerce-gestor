import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from "vitest";
import { CreateReview } from "../../src/use-cases/create-review";
import { ReviewRepository } from "../../src/repositories/review-repository";
import { Review } from "../../src/entities/review";

describe("CreateReview Use Case", () => {
  let reviewRepo: ReviewRepository;
  let createReview: CreateReview;

  beforeAll(() => {
    // Mockear solo el método, sin reemplazar todo crypto
    vi.spyOn(globalThis.crypto, "randomUUID").mockReturnValue("uuid-1234" as any);


  });

  afterAll(() => {
    // Restaurar comportamiento original
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    reviewRepo = {
      save: vi.fn().mockResolvedValue(undefined),
    } as unknown as ReviewRepository;

    createReview = new CreateReview(reviewRepo);
  });

  it("debería crear una reseña correctamente y guardarla", async () => {
    const userId = "user1";
    const productId = "prod1";
    const rating = 5;
    const comment = "Excelente producto";

    const result = await createReview.execute(userId, productId, rating, comment);

    expect(result).toBeInstanceOf(Review);
    expect(result.id).toBe("uuid-1234");
    expect(result.userId).toBe(userId);
    expect(result.productId).toBe(productId);
    expect(result.rating).toBe(rating);
    expect(result.comment).toBe(comment);
    expect(result.createdAt).toBeInstanceOf(Date);

    expect(reviewRepo.save).toHaveBeenCalledWith(result);
  });

  it("debería fallar si el repositorio lanza un error", async () => {
    (reviewRepo.save as any).mockRejectedValueOnce(new Error("Error al guardar"));

    await expect(
      createReview.execute("user1", "prod1", 5, "Excelente producto")
    ).rejects.toThrow("Error al guardar");
  });
});
