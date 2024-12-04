// import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { UserRole } from '../users/entities/user.entity';

// @Injectable()
// export class RolesMiddleware implements NestMiddleware {
//     constructor(private allowedRoles: UserRole[]) { }

//     use(req: Request, res: Response, next: NextFunction) {
//         console.log(req);
//         console.log(res);
//         const user = req['user'];

//         if (!user || !this.allowedRoles.includes(user.role)) {
//             throw new ForbiddenException('Insufficient permissions');
//         }

//         next();
//     }
// }
