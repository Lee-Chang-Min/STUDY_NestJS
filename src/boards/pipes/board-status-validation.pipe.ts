import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../boards.model';

export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptoins = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value);
        
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} isnt in the status `)
        }

        return value;

    }

    private isStatusValid(status: any){
        const index = this.StatusOptoins.indexOf(status);
        return index !== -1;
    }
}

