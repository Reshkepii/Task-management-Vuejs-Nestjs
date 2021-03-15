import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ){}


    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        
        const {username,password} = authCredentialsDto;
         
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password= await this.hashPassword(password, user.salt);

        try {
            await user.save();
       } catch (error) {
           if(error.code === 'ER_DUP_ENTRY') {// duplicated usernames 
               throw new ConflictException('Username already exists');
           } else {
               throw new InternalServerErrorException();
           }
       }
    }

    async signIn(authCredentialsDto: AuthCredentialsDto):Promise<{ accessToken: string}>{
        const username = await this.validateUserPassword(authCredentialsDto);

        if(!username) {
            throw new UnauthorizedException(' Invalid credentials ');
        }

        const payload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }



    
    /*----*/
    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string>{
        const { username , password } = authCredentialsDto;
       const user = await this.userRepository.findOne({username});

        if(user && await user.validatePassword(password)) {
            return user.username;
        }else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string):Promise<string>{
        return bcrypt.hash(password,salt)
    }
}
