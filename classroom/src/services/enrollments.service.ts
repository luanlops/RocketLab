import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

interface GetByCourseAndStudentIdParams{
  courseId: string,
  studentId: string
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService){}

  getByCourseAndStudentId({courseId,studentId }: GetByCourseAndStudentIdParams){
    return this.prisma.enrollement.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null
      }
    })
  }

  listAllEnrollments(){
    return this.prisma.enrollement.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  listAllEnrollmentsByStudent(studentId: string){
    return this.prisma.enrollement.findMany({
      where: {
        studentId,
        canceledAt: null,        
      },
      orderBy: {
        canceledAt: 'desc'
      }
    })
  }
}