import {
  Body,
  Controller,
  Delete,
  Get,
  HttpResponse,
  Param,
  Put,
} from "../../src";
import { FamillyInput, FamillyObject } from "../inputs/FamillyInputs";
import { FamillyService } from "../services/FamillyService";

@Controller("/familly")
export class FamillyController {
  constructor(private famillyService: FamillyService) {}

  @Get("/", () => [FamillyObject], {
    description: "Return all families in database",
  })
  async getFamillies(): HttpResponse<FamillyObject[]> {
    const families = await this.famillyService.getAllFamillies();
    return { code: 200, data: families };
  }

  @Get("/:id", () => FamillyObject, {
    description: "Return the familly matching the id",
  })
  async getFamilly(@Param("id") id: string): HttpResponse<FamillyObject> {
    const family = await this.famillyService.getFamillyById(id);
    return { code: 200, data: family };
  }

  @Put("/:id", () => FamillyObject, {
    description: "Edit the familly matching the id",
  })
  async putFamilly(
    @Param("id") id: string,
    @Body { email, name }: FamillyInput
  ): HttpResponse<FamillyObject> {
    const updatedFamilly = await this.famillyService.updateFamillyById(id, {
      email,
      name,
    });

    return { code: 201, data: updatedFamilly };
  }

  @Delete("/:id", () => FamillyObject, {
    description: "Delete the familly matching the id",
  })
  async deleteFamilly(@Param("id") id: string): HttpResponse<FamillyObject> {
    const family = await this.famillyService.deleteFamillyById(id);
    if (!family) return { code: 404, error: "Family not found" };
    return { code: 204, data: null };
  }
}
