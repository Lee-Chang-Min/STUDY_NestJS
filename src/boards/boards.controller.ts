import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-boards.dto';
import { BoardStatus } from './boards-status.enum';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardService: BoardsService){}


    @Get()
    getAllBoard(): Promise<Board[]> {
        return this.boardService.getAllBoards();
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number) : Promise<Board> {
        return this.boardService.getBoardById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardService.createBoard(CreateBoardDto)
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): void {
        this.boardService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus ,
        //@Body('status', BoardStatusValidationPipe) status: BoardStatus
    ){
        
        console.log(status);
        
        return this.boardService.updateBoardStatus(id, status);
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    // @Get()
    // getAllBoard(){
    //     return this.boardService.getAllBoards();
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    //     return this.boardService.createBoard(createBoardDto)
    // }

    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardService.getBoardById(id)
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus ,
    //     //@Body('status', BoardStatusValidationPipe) status: BoardStatus
    // ){
        
    //     console.log(status);
        
    //     return this.boardService.updateBoardStatus(id, status);
    // }

}
