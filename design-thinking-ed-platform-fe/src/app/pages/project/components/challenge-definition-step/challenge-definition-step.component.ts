import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {
  ChallengeDefinitionResponse,
  ResponseType,
} from '../../../../common/interfaces/challenge-definition-response.interface';
import { ChallengeDefinitionFacade } from '../../../../stores/challenge-definition-store/challenge-definition.facade';
import { UserFacade } from '../../../../stores/user-state-store/user.facade';
import { IUser } from '../../../../common/interfaces/user.interface';

@Component({
  selector: 'app-challenge-definition-step',
  templateUrl: './challenge-definition-step.component.html',
  styleUrls: ['./challenge-definition-step.component.scss'],
})
export class ChallengeDefinitionStepComponent implements OnInit {
  projectId: number | null = null;
  currentUserId!: number;
  problemsForm: FormGroup;
  targetAudienceForm: FormGroup;
  howWeCanForm: FormGroup;
  brainstormForm: FormGroup;

  displayedColumns: string[] = ['content', 'actions'];

  problemsResponses$: Observable<ChallengeDefinitionResponse[]>;
  targetAudienceResponses$: Observable<ChallengeDefinitionResponse[]>;
  howWeCanResponses$: Observable<ChallengeDefinitionResponse[]>;
  brainstormResponses$: Observable<ChallengeDefinitionResponse[]>;

  problemsDataSource = new MatTableDataSource<ChallengeDefinitionResponse>([]);
  targetAudienceDataSource =
    new MatTableDataSource<ChallengeDefinitionResponse>([]);
  howWeCanDataSource = new MatTableDataSource<ChallengeDefinitionResponse>([]);
  brainstormDataSource = new MatTableDataSource<ChallengeDefinitionResponse>(
    []
  );

  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  ResponseType = ResponseType;

  constructor(
    private fb: FormBuilder,
    private challengeDefinitionFacade: ChallengeDefinitionFacade,
    private userFacade: UserFacade,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.problemsForm = this.fb.group({
      content: ['', Validators.required],
    });

    this.targetAudienceForm = this.fb.group({
      content: ['', Validators.required],
    });

    this.howWeCanForm = this.fb.group({
      content: ['', Validators.required],
    });

    this.brainstormForm = this.fb.group({
      content: ['', Validators.required],
    });

    this.problemsResponses$ = this.challengeDefinitionFacade.getResponsesByType(
      ResponseType.PROBLEMS
    );
    this.targetAudienceResponses$ =
      this.challengeDefinitionFacade.getResponsesByType(
        ResponseType.TARGET_AUDIENCE
      );
    this.howWeCanResponses$ = this.challengeDefinitionFacade.getResponsesByType(
      ResponseType.HOW_WE_CAN
    );
    this.brainstormResponses$ =
      this.challengeDefinitionFacade.getResponsesByType(
        ResponseType.BRAINSTORM
      );

    this.loading$ = this.challengeDefinitionFacade.loading$;
    this.error$ = this.challengeDefinitionFacade.error$;
  }

  ngOnInit(): void {
    this.userFacade.user$.subscribe((user: IUser | null) => {
      if (user) {
        this.currentUserId = Number(user.id);
      }
    });

    this.route.params.subscribe((params) => {
      const projectId = Number(this.route.parent?.snapshot.params['projectId']);
      this.projectId = projectId;
      this.challengeDefinitionFacade.loadResponses(
        projectId,
        this.currentUserId
      );

      this.error$.subscribe((error: any) => {
        if (error) {
          console.error('Error loading challenge definition:', error);
        }
      });
    });

    this.problemsResponses$.subscribe((responses) => {
      this.problemsDataSource.data = responses || [];
    });

    this.targetAudienceResponses$.subscribe((responses) => {
      this.targetAudienceDataSource.data = responses || [];
    });

    this.howWeCanResponses$.subscribe((responses) => {
      this.howWeCanDataSource.data = responses || [];
    });

    this.brainstormResponses$.subscribe((responses) => {
      this.brainstormDataSource.data = responses || [];
    });
  }

  onSubmit(responseType: ResponseType): void {
    let form: FormGroup;
    switch (responseType) {
      case ResponseType.PROBLEMS:
        form = this.problemsForm;
        break;
      case ResponseType.TARGET_AUDIENCE:
        form = this.targetAudienceForm;
        break;
      case ResponseType.HOW_WE_CAN:
        form = this.howWeCanForm;
        break;
      case ResponseType.BRAINSTORM:
        form = this.brainstormForm;
        break;
      default:
        return;
    }

    if (form.valid && this.projectId) {
      const { content } = form.value;
      this.challengeDefinitionFacade.createResponse(
        responseType,
        content,
        this.currentUserId,
        this.projectId
      );
      form.reset();
    }
  }

  onUpvote(response: ChallengeDefinitionResponse): void {
    if (response.hasVoted) {
      this.challengeDefinitionFacade.removeVote(
        response.id,
        this.currentUserId
      );
    } else {
      this.challengeDefinitionFacade.upvoteResponse(
        response.id,
        this.currentUserId
      );
    }
  }

  onToggleSelection(response: ChallengeDefinitionResponse): void {
    this.challengeDefinitionFacade.toggleResponseSelection(
      response.id,
      this.currentUserId
    );
  }

  onDelete(response: ChallengeDefinitionResponse): void {
    if (confirm('Tem certeza que deseja excluir esta resposta?')) {
      this.challengeDefinitionFacade.deleteResponse(
        response.id,
        this.currentUserId
      );
    }
  }

  onUpdate(response: ChallengeDefinitionResponse, newContent: string): void {
    if (newContent.trim() !== response.content) {
      this.challengeDefinitionFacade.updateResponse(
        response.id,
        newContent,
        this.currentUserId
      );
    }
  }
}
