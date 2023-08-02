import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './dto/create-boards.dto';
import { BoardStatus } from './boards-status.enum';
import { User } from 'src/auth/user.entity,';


export class BoardRepository extends Repository<Board>{
    constructor(@InjectRepository(Board) private dataSource: DataSource){
        super(Board, dataSource.manager);
    }

    async getBoardById(id: number) {
    	return await this.findOneBy({id});
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const {title, description} = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })

        await this.save(board)
        return board;

    }

    // async deleteBoard(id: number): Promise<void> {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((x) => x.id !== found.id)

    // }

}