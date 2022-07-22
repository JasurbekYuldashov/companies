import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class ResponseDto {
  // Validates for a non-empty string
  @IsNumber()
  @IsNotEmpty()
  public statusCode: number;

  // Gets only validated if it's part of the request's body
  @IsNotEmpty()
  @IsOptional()
  @IsObject()
  public result: object;

  @IsNotEmpty()
  @IsOptional()
  @IsObject()
  public error: object;
  // Validates for an integer
  @IsString()
  @IsOptional()
  public message: string;
}
