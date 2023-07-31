import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-boards.dto';
import { BoardRepository } from './board.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(
        //@InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ){}

    async getAllBoards(): Promise<Board[]>{
        return this.boardRepository.find();
    }

    getBoardById(id: number): Promise<Board> {
        const found = this.boardRepository.getBoardById(id);

        if(!found) {
            throw new NotFoundException(`Cant find Board with id ${id}`);
        }
        return found;
    }
    
    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if(result.affected === 0) {
            throw new NotFoundException(`Cant find Board with id ${id}`)
        }
         //console.log('result', result);        
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        
        board.status = status;
        await this.boardRepository.save(board);

        return board;

    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    // getAllBoards(): Board[] {
    //     return this.boards
    // }

    // createBoard(createBoardDto: CreateBoardDto) {
    //     //const title = createBoardDto.title //아래와 같음
    //     //const { title } =  createBoardDto
    //     const { title,  description } =  createBoardDto
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status:BoardStatus.PUBLIC
    //     }
    //     this.boards.push(board);
    //     return board;``
    // }

    // getBoardById(id: string): Board {
    //     const found = this.boards.find((x) => x.id === id);
    //     if(!found){
    //         throw new NotFoundException(`id를 찾지 못했습니다 ${id}`);
    //     }
    //     return found;
    // }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((x) => x.id !== found.id)
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    //}
}
