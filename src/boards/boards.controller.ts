import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-boards.dto';
import { Board } from './boards.model';

@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService){}

    @Get()
    getAllBoard(){
        return this.boardService.getAllBoards();
    }

    @Post()
    createBoard(@Body() createBoardDto: CreateBoardDto) {
        return this.boardService.createBoard(createBoardDto)
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boardService.getBoardById(id)
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void {
        this.boardService.deleteBoard(id);
    }
}
