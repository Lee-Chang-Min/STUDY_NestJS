import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-boards.dto';
import { BoardRepository } from './board.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity,';

@Injectable()
export class BoardsService {
    constructor(
        //@InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ){}

    async getAllBoards(user: User): Promise<Board[]>{
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.userId = :userId', { userId: user.id})
        const boards = await query.getMany();

        return boards
    }

    getBoardById(id: number): Promise<Board> {
        const found = this.boardRepository.getBoardById(id);

        if(!found) {
            throw new NotFoundException(`Cant find Board with id ${id}`);
        }
        return found;
    }
    
    createBoard(createBoardDto: CreateBoardDto, user:User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async deleteBoard(id: number, user: User): Promise<void> {
        const query = this.boardRepository.createQueryBuilder('board');
        query.delete().from('board')
        .where("userId = :userId", { userId: user.id })
        .andWhere("id = :id", { id: id})
        const result = await query.execute()

        if(result.affected === 0) {
            throw new NotFoundException(`Cant find Board with id ${id}`)
        }
        console.log('result', result);        
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
