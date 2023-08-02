import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-boards.dto';
import { BoardStatus } from './boards-status.enum';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity,';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardController')
    constructor(private boardService: BoardsService){}


    @Get()
    getAllBoard(
        @GetUser() user: User
    ): Promise<Board[]> {
        this.logger.verbose(`User ${user.username} trying to get all boards`)
        return this.boardService.getAllBoards(user);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number) : Promise<Board> {
        return this.boardService.getBoardById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() CreateBoardDto: CreateBoardDto,
        @GetUser() user:User
    ): Promise<Board> {
        return this.boardService.createBoard(CreateBoardDto, user)
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number,
    @GetUser() user:User): void {
        this.boardService.deleteBoard(id, user);
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
