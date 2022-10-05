import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtUserStrategy extends AuthGuard('userjwt') {}

@Injectable()
export class JwtAdminStrategy extends AuthGuard('adminjwt') {}

@Injectable()
export class JwtBothStrategy extends AuthGuard('bothjwt') {}
